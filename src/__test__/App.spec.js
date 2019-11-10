import { mount, createLocalVue } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
    const wrapper = mount(App, {});
            
    const getResult = jest.fn();
    const showError = jest.fn();


    test('setup correctly', () => {
        expect(true).toBe(true);
    })
    
    test('App has a .center-content class', () => {
        expect(wrapper.classes()).toContain('center-content')
    })

    test('call getResult task when the submit button is clicked', () => {

        wrapper.setMethods({
            getResult: getResult
        });

        wrapper.find('button').trigger('click');

        expect(getResult).toHaveBeenCalled();

    })

    test('add value to checkedNotes array when checkbox is called', () => {

        let checkbox = wrapper.find('input.app-form__checkbox');
        checkbox.trigger('click');

        expect(wrapper.vm.checkedNotes.push(checkbox.value))
    })

    test('Show error message \'Empty set\' if user didn\'t provide an entry amount', () => {
        
        wrapper.setData({ entryAmount: null })  
        
        
        wrapper.setMethods({
            getResult: getResult,
            showError: showError
        });

        wrapper.find('button').trigger('click');
        getResult();

        expect(wrapper.find('.app-form__error-block').exists()).toBe(true)

    })

});
