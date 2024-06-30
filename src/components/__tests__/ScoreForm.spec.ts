import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import ScoreForm from '@/components/ScoreForm.vue'
import axios from 'axios'
import api from '../../api/api'
import type { Score } from '../../types/scoreType'


describe('ScoreForm.vue', () => {

  const emptyResponse: Score[] = []
  const twoItemResponse: Score[] = [
    { "id": 1738, "nickname": "dkjng", "timeInSeconds": 2, "difficulty": "easy", "createdAt": "2015-06-27T16:21:51.453306" },
    { "id": 2410, "nickname": "gfhmgh", "timeInSeconds": 3, "difficulty": "medium", "createdAt": "2016-06-27T16:21:51.453306" }
  ]

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