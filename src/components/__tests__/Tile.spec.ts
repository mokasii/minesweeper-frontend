import { mount } from '@vue/test-utils'
import Tile from '@/components/Tile.vue'
import {describe, it, expect, vi} from 'vitest';


describe('Tile.vue', () => {
  it('displays a bomb when containsBomb prop is true', () => {
    const wrapper = mount(Tile, {
      props: {
        containsBomb: true,
        revealed: true,
        flagged: false,
        adjacentBombs: 0
      }
    })

    expect(wrapper.text()).toContain('💣')
  })

  it('displays a flag when flagged prop is true', () => {
    const wrapper = mount(Tile, {
      props: {
        containsBomb: false,
        revealed: false,
        flagged: true,
        adjacentBombs: 0
      }
    })
    expect(wrapper.text()).toContain('🚩')
  })

  it('displays adjacentBombs when revealed and containsBomb prop is false', () => {
    const wrapper = mount(Tile, {
      props: {
        containsBomb: false,
        revealed: true,
        flagged: false,
        adjacentBombs: 3
      }
    })
    expect(wrapper.text()).toContain('3')
  })

  it('emits reveal event when tile is clicked and not flagged or revealed', async () => {
    const wrapper = mount(Tile, {
      props: {
        containsBomb: false,
        revealed: false,
        flagged: false,
        adjacentBombs: 0
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('reveal')
  })

})