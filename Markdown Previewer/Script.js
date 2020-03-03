const projectName = "markdown-previewer";

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}" class="linked" >${text}` + '</a>';
}

class Previewer extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ? 
          ['editorWrap maximized', 
           'previewWrap hide', 
           'fa fa-compress'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 
           'previewWrap maximized', 
           'fa fa-compress'] :
          ['editorWrap', 
           'previewWrap', 
           'fa fa-arrows-alt'];
    return (
      <div>
        <h1 id='page-title'>Behold I Did Something</h1>
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]} 
            onClick={this.handleEditorMaximize}
            text="Editor"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
        <div className="converter">
        </div>
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]} 
            onClick={this.handlePreviewMaximize}
            text="Previewer"/>
          <Preview  markdown={this.state.markdown}/>
        </div>
        <div id='footer'>Created by Gabriel Cohavy</div>
      </div>
    )
  }
};

const Toolbar = (props) => {
    return (
      <div className="toolbar">    
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}

const placeholder = 
`
# Previewing the Effects of the Marked Language

## Sub-headings...
### And some other things:
  
Heres some inline code: \`inline code\`

\`\`\`
And here is some multiline code. tada
\`\`\`
**THIS TEXT IS BOLD**
_and this is italic_.
*or this is italic*
**_YES IT is possible to DO BOTH_**

There are also links: [CLICK ME RIGHT NOW](https://www.google.com), and block quotes:
> Block quote

- You can create lists
  - that look like this
    - and we can keep indenting forever
      - and adding images: 

![Cool lookin image from google](https://allthatsinteresting.com/thumb/800.422.https://allthatsinteresting.com/wordpress/wp-content/uploads/2013/09/interesting-pictures-of-clouds.jpg)

1. There's basically so much you can do and I'm too lazy to preview everything. 
1. So good luck to you. 
1. Experiment a little.
`

marked.setOptions({
  breaks: true,
});

ReactDOM.render(<Previewer />, document.getElementById(projectName));
