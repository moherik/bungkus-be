import React from 'react';

export const TextInput = React.forwardRef(
  ({ label, name, className, errors = [], ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label className="form-label" htmlFor={name}>
            {label}:
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          {...props}
          className={`form-input ${errors.length ? 'error' : ''}`}
        />
        {errors && <div className="form-error">{errors}</div>}
      </div>
    );
  }
);
