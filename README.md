# NextLayouts
Small util for persistent layouts in Next.Js


```javascript

//_app.js
import NextLayout from 'NextLayouts'
import layoutsList from "../path/to/layouts"
NextLayout.layoutsList = layoutsList

//layoutList should be a index object of layouts { BaseLayout, CustomLayout }


class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props
    return NextLayout(Component, pageProps)
  }
}

```

NextJs Page example:

```javascript
const Homepage = () => <p>homepage</p>

Homepage.layout = 'BaseLayout'

export default homepage
```

NextJs Nested Layout Page using dot notation example:

```javascript
const Homepage = () => <p>homepage</p>

Homepage.layout = 'BaseLayout.WrapperLayout.AnotherLayout'

export default homepage
```

Layouts themselves can have layouts; Watchout for loops between layouts calling each other.

```javascript
const Otherlay = ({ children }) => (
  <>
    <div>{children}</div>
  </>
);
Otherlay.layout = 'BaseLayout'
export default Otherlay;

```
