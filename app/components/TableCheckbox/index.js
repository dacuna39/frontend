import React from 'react';
import PropTypes from 'prop-types';
import CheckboxTableStyle from './checkboxTableStyle';
import styled from 'styled-components';

const CheckboxTableStyle = styled.CheckboxTableStyle`
    position: fixed;
    left: 0;
    text-align: left;
`;

function TableCheckbox() {
    return (
        <CheckboxTableStyle>
        <table>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">Show Sent</label>
            </th>
        </tr>
        <tr>
            <th>
                <input type="checkbox" id="classSubject" name="subject" value="subject"></input>
                <label for="classSubject">Show Accepted</label>
            </th>
        </tr>
        <tr>
            <th><button type="submit">Filter</button></th>
        </tr>
        </table>
        </CheckboxTableStyle>
    );
}


    // return React.createElement('div', {}, React.createElement('table', {}, React.createElement('tr', {}, React.createElement('th', {}, React.createElement('input', {
    //     'type': 'checkbox',
    //     'id': 'classSubject',
    //     'name': 'subject',
    //     'value': 'subject'
    // }), React.createElement('label', { 'htmlFor': 'classSubject' }, 'Show Sent')), React.createElement('tr', {}, React.createElement('th', {}, React.createElement('input', {
    //     'type': 'checkbox',
    //     'id': 'classSubject',
    //     'name': 'subject',
    //     'value': 'subject'
    // }), React.createElement('label', { 'htmlFor': 'classSubject' }, 'Show Accepted'))), React.createElement('tr', {}, React.createElement('th', {}, React.createElement('button', { 'type': 'submit' }, 'Filter'))))));



export default TableCheckbox;