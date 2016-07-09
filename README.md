# React-Loupe :mag:

React component to turn ordinary images into images with magnifyer glass overlay.

## Install
```sh
npm install @walkerandolphsmith/react-loupe
```

## Usage

1. Default 

```jsx
<Loupe image={'url'}></Loupe>
```

<img src="https://dl.dropboxusercontent.com/u/103371057/react-loupe/default.png" />

2. Override image styles

```jsx
<Loupe image={'url'} styles={{ border: '1px solid green' }}></Loupe>
```

<img src="https://dl.dropboxusercontent.com/u/103371057/react-loupe/override-container.png" />

3. Override loupe styles 

```jsx
<Loupe image={'url'} loupeStyles={{ border: '1px solid green', borderRadius: '50%' }}></Loupe>
```

<img src="https://dl.dropboxusercontent.com/u/103371057/react-loupe/override-loupe.png" />


## Development
###Build
`npm run build`

###Open storybook
`npm start`
