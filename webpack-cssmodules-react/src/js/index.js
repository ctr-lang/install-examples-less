/**
 * Let's react about it
 */
import React                     from 'react';
import ReactDOM                  from 'react-dom';
import styles                    from './base.less';
import UsingStyleName            from './UsingStyleName';
import UsingStylesProperty       from './UsingStylesProperty';
import UsingStylesPropertyStyles from './UsingStylesProperty/index.less';

ReactDOM.render(<div className={styles.container}>
    <UsingStyleName />
    <UsingStylesProperty styles={UsingStylesPropertyStyles} />
</div>, document.querySelector('#app'));
