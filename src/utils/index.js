import React from "react";

/**
 * 注入对象给被包装组件，返回被包装组件
 * @param {*} obj {a:100}
 */

const inject = obj => Comp => props => <Comp {...obj} {...props}/>;
export {inject};