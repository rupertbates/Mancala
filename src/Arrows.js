import React from 'react';

const arrowSize = 40;

function ArrowUp(props) {
    return (
        <svg className={"arrow arrow-up"} xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox="0 0 444.819 444.819"><path d="M434.252 208.708L248.387 22.843c-7.042-7.043-15.693-10.564-25.977-10.564-10.467 0-19.036 3.521-25.697 10.564L10.848 208.708C3.615 215.94 0 224.604 0 234.692c0 9.897 3.619 18.459 10.848 25.693l21.411 21.409c6.854 7.231 15.42 10.855 25.697 10.855 10.278 0 18.842-3.624 25.697-10.855l83.939-83.651v200.998c0 9.89 3.567 17.936 10.706 24.126 7.139 6.184 15.752 9.273 25.837 9.273h36.545c10.089 0 18.698-3.09 25.837-9.273 7.139-6.188 10.712-14.236 10.712-24.126V198.144l83.938 83.651c6.848 7.231 15.413 10.855 25.7 10.855 10.082 0 18.747-3.624 25.975-10.855l21.409-21.409c7.043-7.426 10.567-15.988 10.567-25.693.001-9.898-3.523-18.559-10.566-25.985z" fill="#FFF"/></svg>
    );
}

function ArrowDown(props) {
    return (
        <svg className={"arrow arrow-down"} xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox="0 0 444.819 444.819"><path d="M434.252 185.721l-21.409-21.413c-7.419-7.042-16.084-10.564-25.975-10.564-10.095 0-18.657 3.521-25.7 10.564l-83.938 83.939V47.255c0-9.9-3.621-18.464-10.855-25.697-7.234-7.232-15.797-10.85-25.693-10.85h-36.545c-9.897 0-18.464 3.621-25.693 10.85-7.236 7.233-10.85 15.797-10.85 25.697v200.992l-83.939-83.939c-7.042-7.042-15.606-10.564-25.697-10.564-9.896 0-18.559 3.521-25.979 10.564l-21.128 21.413C3.615 192.948 0 201.615 0 211.7c0 10.282 3.619 18.848 10.848 25.698l185.864 186.146c7.045 7.046 15.609 10.567 25.697 10.567 9.897 0 18.558-3.521 25.977-10.567l185.865-186.146c7.043-7.043 10.567-15.608 10.567-25.698.001-9.895-3.523-18.555-10.566-25.979z" fill="#FFF"/></svg>
    );
}

export {
    ArrowUp,
    ArrowDown,
}