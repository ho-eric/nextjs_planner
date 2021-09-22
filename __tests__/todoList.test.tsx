import { shallow } from 'enzyme';
import React from 'react';

import TodoList from '../components/TodoList';

describe("Test TodoList Component", () => {
    it("Should display 'Task Time Breakdown:'", () => {
        const todoList = shallow(<TodoList />)
        expect(todoList.find("h2").text()).toEqual("Task Time Breakdown:");
    });
});

