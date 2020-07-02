    /**
     * jsonp获取请求数据
     * @param {object}options
     */
    function jsonp(options) {
      // console.log(options);
      // 1. 产生不同的函数名(函数名随机)
      let callBackName = 'itLike' + Math.random().toString().substr(2)+ Math.random().toString().substr(2);
      // console.log(callBackName);

      // 2. 产生一个全局函数
      window[callBackName] = function (params) {
          // console.log(params);
          // console.log(options.success);
          if(params !== null){
              options.success(params);
          }else{
              options.failure(params);
          }

          // 2.1 删除当前脚本标签
          scriptE.remove();
          // 2.2 将创建的全局函数设为null
          window[callBackName] = null;
      };

      // 3. 取出url地址
      let jsonpUrl;
      if(options.data !== undefined){
          jsonpUrl = options.url + '?' + options.data + '&callBack=' + callBackName;
      }else {
          jsonpUrl = options.url + '?callBack=' + callBackName;
      }
      // console.log(jsonpUrl);

      // 4. 创建script标签
      let scriptE = document.createElement('script');
      scriptE.src = jsonpUrl;
      document.body.appendChild(scriptE);
  }

  router.get('/api/login', (req, res, next) => {
    res.json({
      success: true,
      message: '登录成功'
    })
  })



  function getData () {
    jsonp({
      url: 'http://10.10.10.1:8080/api/login',
      data: 'count=test&&password=123456',
      sussess: function (data) {
        console.log(data)
      },
      failure: function (data) {
        console.log('数据请求失败')
        console.log(data)
      }
    })
  }