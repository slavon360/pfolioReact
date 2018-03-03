import React from 'react';
import classes from './Paragraphs.css';

const paragraphs = (props) => {
    let technologies = props.currentWork.technologies.split(',');
    technologies = technologies.map((tech, index) => {
        return <div className={classes.Tech} key={index}>{tech}</div>
    })
    return (
      <div
        className={classes.ParagraphsWrp}>
        <p className={classes.FirstParag}>
          <span className={classes.Story}>{props.currentWork.more.story}</span>
          Ornare arcu odio ut sem nulla pharetra diam sit amet. Fames ac turpis egestas integer eget aliquet nibh praesent. Quis lectus nulla at volutpat. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Aliquam faucibus purus in massa tempor nec. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Tortor at risus viverra adipiscing at in. Mattis aliquam faucibus purus in massa tempor nec. Quisque sagittis purus sit amet. Pulvinar neque laoreet suspendisse interdum consectetur libero id.
        </p>
        <p className={classes.SecondParag}>Vel fringilla est ullamcorper eget nulla. Lacus suspendisse faucibus interdum posuere. Ut morbi tincidunt augue interdum velit. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Fermentum leo vel orci porta non pulvinar. Ut consequat semper viverra nam libero justo laoreet. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Id interdum velit laoreet id donec ultrices. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Nulla porttitor massa id neque aliquam vestibulum. Ridiculus mus mauris vitae ultricies. In eu mi bibendum neque egestas congue. Eu ultrices vitae auctor eu. Leo vel fringilla est ullamcorper. Aliquam etiam erat velit scelerisque in dictum non consectetur a.</p>
        <div className={classes.TechWrp}>
          <div className={classes.TechKey}>{props.currentWork.more.usedTech}</div>
          <div className={classes.TechValue}>{technologies}</div>
        </div>
        <div className={classes.LinkWrp}>
          <div>Visit site</div>
          <div>
            <a
              href={props.currentWork.link}
              target="_blank">{props.currentWork.title}</a>
          </div>
        </div>
      </div>
    );
}

export default paragraphs;
