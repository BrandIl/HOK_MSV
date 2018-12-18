import Vue from 'vue';
import './credit.component'

Vue.component('credits', {
  data: function () {
    return {
      count: 0
    }
  },
  props: ['credits'],
  render() {
    const { credits } = this;
   
    return <div>
      {credits.map((crd,i) => <credit credit={crd} index={i+1}/>)}
    </div>
  }
})