<template>
  <div
    v-if="isNew || isTeam"
    class="member-badge flex items-center ml-1"
  >
    <el-tooltip
      v-if="isNew"
      placement="top"
      :content="computedTooltipContent('new')"
    >
      <div v-if="isNew" :class="computedBadgeClass('new')">
        New
      </div>
    </el-tooltip>
    <el-tooltip
      v-if="isTeam"
      placement="top"
      :content="computedTooltipContent('team')"
    >
      <div :class="computedBadgeClass('team')">Team</div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AppMemberBadge'
}
</script>

<script setup>
import { defineProps, computed } from 'vue'
import moment from 'moment/moment'

const props = defineProps({
  member: {
    type: Object,
    default: () => {}
  }
})

const isTeam = computed(() => {
  return props.member.attributes.isTeamMember
})

const isNew = computed(() => {
  return (
    moment().diff(moment(props.member.joinedAt), 'days') <=
    14
  )
})

const computedBadgeClass = function (badge) {
  let classes =
    'badge inline-flex uppercase !text-3xs !px-1 !py-0 leading-normal font-semibold'

  if (badge === 'new') {
    classes += ' badge--brand'
    if (isTeam.value) {
      classes += ' mr-1'
    }
  } else if (badge === 'team') {
    classes += ' badge--gray'
  }

  return classes
}

const computedTooltipContent = function (tooltip) {
  return tooltip === 'new'
    ? `Member since ${moment(props.member.joinedAt).format(
        'MMM DD, YYYY'
      )}`
    : `Team member`
}
</script>

<style lang="scss">
.flex > .member-display-name + .member-badge,
.inline-flex > .member-display-name + .member-badge {
  @apply ml-2;
}
</style>
