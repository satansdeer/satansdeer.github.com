---
title: Controlled And Uncontrolled Forms In React
date: 2019-03-10T04:09:45.284Z
categories: React
image: thumb.jpg
---

There are two ways of working with forms in React. **Controlled** and **uncontrolled**.

Let's see when should you use each of them.

## Uncontrolled Forms

The easiest way to handle forms in react is to use **uncontrolled** inputs.

In **uncontrolled** components form data is being handled by DOM itself.

For example here we can reference form values by name. Let's say we have a `ProfileForm` with following code:

```jsx
class ProfileForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    // Here we do something with form data
    console.log(firstName, lastName)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="firstName" type="text" />
        </label>
        <label>
          Surname:
          <input name="lastName" type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

This is quick and dirty way of handling forms. It is mostly useful for simple forms or when you are _just learning React_.

## Controlled Forms

More _React way_ of working with forms is using **controlled forms**.

When you use **controlled** inputs - you specify its current value as a prop, as well as a callback to change that value.

```jsx
<input value={someValue} onChange={handleChange} />
```

Here is a **controlled** version of `ProfileForm`:

```jsx
class ProfileForm extends Component {
  state = {firstName: '', lastName: ''}

  handleSubmit = (event) => {
    // Do something with form data
    // maybe send it to backend ¯\_(ツ)_/¯
  }

  handleFirstNameChange = (event) => {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange = (event) => {
    this.setState({ lastName: e.target.value });
  }

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={this.handleFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={this.handleLastNameChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

We could simplify this example and use generic change handler, so we don't have to specify separate function for every input.

```jsx
class ProfileForm extends Component {
  state = {firstName: '', lastName: ''}

  handleSubmit = (event) => {
    // Do something with form data
    // maybe send it to backend ¯\_(ツ)_/¯
  }

  handleChange = (event) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

One caveat here is that `checkbox` will have attribute `checked` instead of `value`. You can use the following code to make it uniform:

```jsx
const value = target.type === 'checkbox' ? target.checked : target.value;
```

Also `file` field is **read-only** and so it's always an **uncontrolled** input.