import * as React from 'react';

export interface Props {
  github: string;
  website: string;
  cv?: string;
}

export const SocialMedia = (props: Props) => (
  <div className="secondary-info ml-md-auto mt-2">
    <ul className="list-unstyled">
      <li className="mb-2">
        <a
          href={`https://${props.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-unstyled"
        >
          <span className="fa-container text-center mr-2">
            <i className="fab fa-github fa-fw" />
          </span>
          {props.github}
        </a>
      </li>
    </ul>
  </div>
);
