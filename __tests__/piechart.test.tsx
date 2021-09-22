import { shallow } from 'enzyme';
import React from 'react';

import PieChart from '../components/PieChart'

describe("Test PieChart Component: ", () => {
    it("Should display a pie chart", () => {
        const props = {
            task: "test task",
            value: 1,
            color: "#999999"
        }
        const wrapper = shallow(<PieChart data={props}/>)
        expect(wrapper).toMatchSnapshot();
    });
});