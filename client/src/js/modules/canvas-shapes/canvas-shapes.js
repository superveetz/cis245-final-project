(function (angular) {
    // declare app and load dependencies
    angular.module('canvas-raining', [
    ])
    .directive('canvasRaining', ['$interval', function ($interval) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                // canvas animation taken from: https://codepen.io/ruigewaard/pen/JHDdF
                elem.ready(() => {
                    let ctx     = elem[0].getContext('2d');
                    const w     = elem.width();
                    const h     = elem.height();

                    ctx.strokeStyle              = 'rgba(174,194,224,0.5)';
                    // ctx.strokeStyle              = 'rgba(0,0,0,1)';
                    ctx.lineWidth                = 0.5;
                    ctx.lineCap                  = 'round';
                    // ctx.globalCompositeOperation ='source-over'; // https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

                    // start

                });
            }
        };
    }]);
})(angular);