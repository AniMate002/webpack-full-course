import $ from 'jquery';

function createAnalytics(){
    let counter = 0;
    let isDestroyed = false
    const listener = () => counter++
    $(document).on('click', listener)
    return{
            destroy(){
                $(document).off('click', listener)
                isDestroyed = true
            },
            getCLicks(){
                if(isDestroyed)
                    return 'Analytics is destoryed'
                return counter
            }
        }
    
}

window.analytics = createAnalytics()