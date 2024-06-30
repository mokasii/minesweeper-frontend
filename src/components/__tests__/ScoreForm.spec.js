import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ScoreForm from '@/components/ScoreForm.vue'

describe('ScoreForm.vue', () => {

  it('renders timeInSeconds and difficulty passed to it', async () => {
    const time = 100;
    const difficulty = 'easy';

    const wrapper = shallowMount(ScoreForm, {
      props: {
        timeInSeconds: time,
        difficulty: difficulty
      }
    })

    await wrapper.vm.$nextTick() // Wait for promises to resolve

    const timeInput = wrapper.find('input[type="number"]')
    expect(timeInput.element.value).toBe(time.toString())
  })


})