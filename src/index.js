import React from 'react'

const NextLayouts = (PageComponent, props={}) => {

  function layoutMap(ComponentFunction, ComponentIsThePage){
    if (ComponentIsThePage && !ComponentFunction.layout) return Array() 
    
    //If there isn't a Layout String return the Layout
    if (!ComponentFunction.layout) return Array(ComponentFunction)

    //If there is a Layout string, split it and map it recursively 
    let map = ComponentFunction.layout.split('.').flatMap(
      //or layout => layoutMap(require(`./components/${layout}`).default)
      layout => layoutMap(NextLayouts.layoutsList[layout], false)
    )

    //Add the Layout itself. If it is not the page.
    if (!ComponentIsThePage && ComponentFunction.layout) map.push(ComponentFunction)
    return map
  }

  //Return a Nested Layout Tree
  return layoutMap(PageComponent, true).reduceRight(
    (prevComponent, LayoutTree) => {
      return React.createElement(LayoutTree, null, prevComponent)
      //or <LayoutTree>{prevComponent}</LayoutTree>
    },
    React.createElement(PageComponent, props))
    //or <PageComponent {...props} />
}

NextLayouts.layoutsList = {}

export default NextLayouts