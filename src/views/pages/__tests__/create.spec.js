import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import Create from '../components/create.vue'
import Vue from 'vue'

describe('Create', () => {
  let wrapper, actions

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const vuetify = new Vuetify()

    actions = {
      createTask: jest.fn(),
      loadTask: jest.fn(),
      loadTags: jest.fn(),
      addTag: jest.fn(),
      deleteTag: jest.fn(),
      resetAddTag: jest.fn(),
      resetDeleteTag: jest.fn()
    }
    const state = {
      tag: {
        hasAddedTag: false,
        hasDeletedTag: false,
        tags: ['test', 'dummy']
      }
    }

    const store = new Vuex.Store({
      actions,
      state
    })

    wrapper = mount(Create, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          dialog: true
        }
      }
    })
  })

  it('Save button should disabled when title is not filled', () => {
    expect(wrapper.find('#create-title').text()).toEqual('New Task')
    expect(wrapper.find('#create-save').props().disabled).toBe(true)
  })

  it('Save button should enabled when title is filled', async () => {
    const titleField = wrapper.find('[data-test="create-title-field"]')
    titleField.setValue('Test')

    await Vue.nextTick()
    await Vue.nextTick()

    expect(wrapper.vm.form.title).toBe('Test')

    expect(wrapper.vm.valid).toBeTruthy()

    expect(wrapper.find('#create-save').props().disabled).toBe(false)

    await wrapper.find('#create-save').trigger('click')

    const {
      task: { id, ...payload }
    } = actions.createTask.mock.calls[0][1]
    expect(payload).toEqual({
      title: 'Test',
      description: '',
      estimatedTime: '',
      images: '',
      status: 0,
      tags: [],
      comments: []
    })
  })
})
