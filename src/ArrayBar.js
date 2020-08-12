import React from 'react'

export default function ArrayBar(props) {

    return (
        <div onMouseEnter = {props.onMouseEnter} onMouseLeave = {props.onMouseLeave} className = {props.className} style = {props.style} key = {props.key}>
            {props.children}
        </div>
    );
}