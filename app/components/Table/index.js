import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableStyle from './TableStyle';


function PostTable() {
    return (
        <TableStyle>
          <table>
            
          </table>
        </TableStyle>
      );
  }


// var SentPostTable = function () {
//     return React.createElement('div', 
//       {}, React.createElement('table', 
//         {}, React.createElement('tr', 
//           {}, React.createElement('th', 
//             {}, 'Student_Post_Name'), React.createElement('th', 
//             {}, 'Student_Post_Rate')), React.createElement('tr', 
//         {}, React.createElement('th', 
//           {}, 'Student_Post_Desired_Subject')), React.createElement('tr', 
//             {}, React.createElement('th', 
//               {}, 'Student_Post_Description')), React.createElement('tr', 
//             {}, React.createElement('th', 
//               {}, 'Willing to tutor groups? ', React.createElement('b', 
//                 {}, 'Answer'))), React.createElement('tr', 
//               {}, React.createElement('th', 
//                 {}, 'Maximum students for group study: ', React.createElement('b', 
//                   {}, 'Answer(2-6+)'))));
// };
 
export default PostTable;