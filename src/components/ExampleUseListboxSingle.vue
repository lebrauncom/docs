<template>
  <section
    class="mx-auto with-max-w flex flex-col gap-8 p-6 rounded-4 shadow-4"
    :class="{
      'bg-primary-20': store.statuses.darkTheme === 'disabled',
      'bg-primary-gray-80': store.statuses.darkTheme === 'enabled',
    }"
  >
    <div
      :ref="listbox.root.ref"
      aria-label="Example listbox"
      class="h-18 flex flex-col overflow-x-scroll shadow-5"
      :class="{
        'bg-white': store.statuses.darkTheme === 'disabled',
        'bg-primary-gray-90': store.statuses.darkTheme === 'enabled',
      }"
    >
      <div
        v-for="(name, index) in organizations"
        :key="name"
        :ref="listbox.options.getRef(index)"
        class="p-2"
        :class="{
          'bg-primary-10 text-primary-90': listbox.is.focused(index) && !listbox.is.selected(index) && store.statuses.darkTheme === 'disabled',
          'bg-primary-50 text-primary-10': listbox.is.selected(index) && store.statuses.darkTheme === 'disabled',
          'bg-primary-gray-70': listbox.is.focused(index) && !listbox.is.selected(index) && store.statuses.darkTheme === 'enabled',
          'bg-primary-50': listbox.is.selected(index) && store.statuses.darkTheme === 'enabled',
        }"
      >
        {{ name }}
      </div>
    </div>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Focused:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ listbox.focused }}</code></pre>
      </section>
      <section class="flex flex-col gap-2">
        <label>Selected:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ listbox.selected ?? 'undefined' }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, readonly } from 'vue'
import { useListbox } from '@baleada/vue-features'
// import { useFetchable } from '@baleada/vue-composition'
import { useStore } from '../composition'
import { names } from '@alexvipond/mulago-foundation-portfolio'
// import type { Organization } from '@alexvipond/mulago-foundation-portfolio'

export default {
  name: 'ExampleUseListboxSingle',
  setup () {
    const organizations = ref(names.slice(0, Math.floor(names.length / 2)))

    const listbox = readonly(useListbox())
          
    return {
      organizations,
      listbox,
      store: useStore(),
    }
  }
}
</script>
