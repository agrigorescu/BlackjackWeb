// Import Vue and the component being tested
import Vue from 'vue'
import Modal from 'public/js/components/Modal.vue'
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('Modal', () => {
  it('sets the correct data', () => {
    expect(typeof Modal.data).toBe('function')
  })

})