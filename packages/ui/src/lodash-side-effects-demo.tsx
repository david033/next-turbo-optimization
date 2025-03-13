/* This lodash import will be dropped if unused */
import * as _ from 'lodash-es';

/* These will be preserved after Tree-shaking */
/* _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }); */
/* window.localStorage.setItem('lodash-demo', 'lodash-demo'); */

/* By default without reference this function will be removed from the bundle */
/* check apps\web\.next\server\app\page.js for winows object*/
function LodashPreserveDemo() {
    /* This lodash usage will drastically increase the bundle size ~700kb */
    /* _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }); */
    window.localStorage.setItem('lodash-demo', 'lodash-demo');

    return null;
}

/* By default without reference this function will be removed from the bundle */
const LodashPreserveConstDemo = () => {
    /* _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }); */
    window.localStorage.setItem('lodash-demo-const', 'lodash-demo-const');

    return null;
}


const LodashDemo = () => {
    /* This line will preserve the function LodashPreserveDemo in the bundle */
    /* LodashPreserveDemo(); */
    /* LodashPreserveConstDemo(); */
    return (
        <div>
            Lodash Demo
        </div>
    );
};

export default LodashDemo;