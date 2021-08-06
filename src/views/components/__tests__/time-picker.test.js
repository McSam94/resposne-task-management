import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import TimePicker from '../time-picker.vue'
import Vue from 'vue'

describe('TimePicker', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    const vuetify = new Vuetify()

    wrapper = mount(TimePicker, {
      localVue,
      vuetify,
      propsData: {
        placeholder: 'Placeholder',
        label: 'Label',
        min: '00:00',
        max: '23:50'
      }
    })
  })

  it('Timepicker dialog should open', async () => {
    const button = wrapper.find('#timepicker-btn')
    button.trigger('click')

    await Vue.nextTick()

    wrapper.find('#timepicker-done').trigger('click')

    await Vue.nextTick()

    expect(button.text()).toBe('Placeholder')
  })
})
