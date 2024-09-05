import * as React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export interface Props {
  title: string;
  validity: string;
  cert_id: string;
  cert_url: string;
  sort_date: string;
  show: boolean;
  end_date: null | string;
}

export const Certification = (props: Props) => (
  <li className="mb-2 position-relative">
    <a href={props.cert_url} target="_blank" rel="noopener noreferrer" className="link-unstyled">
      {props.end_date == null || dayjs(props.end_date, 'DD/MM/YYYY').isAfter(dayjs()) ?
        (<div className="resume-award-name">{props.title}</div>) :
        (<div className="resume-award-name"><s>{props.title}</s> (expired)</div>)}
    </a>
    <div className="resume-award-validity">{props.validity}</div>
  </li>
);
