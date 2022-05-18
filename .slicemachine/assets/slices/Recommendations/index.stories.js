import MyComponent from '../../../../slices/Recommendations';

export default {
  title: 'slices/Recommendations'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"recommendations","items":[{"post":{"link_type":"Web","url":"http://google.com"}},{"post":{"link_type":"Web","url":"http://google.com"}},{"post":{"link_type":"Web","url":"https://slicemachine.dev"}}],"primary":{},"id":"_Default"}} />
_Default.storyName = 'Default'
