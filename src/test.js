var myPromise = new Promise((resolve, reject) => {
    // resolve('hello'); // 执行，置状态为fulfilled
    console.log('~~~~~~~~~~~~~~~~');
    reject('world'); // 永远执行不到
    });

console.log(myPromise);

myPromise.then(
    /*如果成功则显示结果*/
    (value) => console.log(1, myPromise, value),
    /*如果失败则显示原因*/
    (reason) => console.log(2, myPromise, reason)
);