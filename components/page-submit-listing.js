import React, { useState, useRef } from 'react';
import BodyClassName from 'react-body-classname';
import { Helmet } from 'react-helmet';
import HeaderPortal from 'components/header-portal';

import 'components/styles/page-submit-listing.scss';

const SubmitListingPage = () => {
  const inputRefs = useRef([]);
  let [isFormSubmitted, setIsFormSubmitted] = useState(false);
  let [isFormDirty, setIsFormDirty] = useState(false);
  let [errorAnnouncement, setErrorAnnouncement] = useState(false);
  const [formState, setFormState] = useState({
    sitename: '',
    location: '',
    fee: 0,
    legalToCamp: false,
    submittername: '',
    email: '',
    notes: '',
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    checkInvalid(event);
  };

  const checkInvalid = (event) => {
    // my method
    // Still used setErrorAnnouncement('Required fields cannot be empty.'); in the submitHandler function
    // inputRefs.current.every((ref) => {
    //   let formField = ref.id;
    //   if (formField !== 'fee' && formField !== 'ownership' && formState[formField].length === 0) {
    //     ref.focus();
    //     return false;
    //   }
    //   return true;
    // });

    // Marcy's solution
    let firstEmptyElementIndex = null;
    let fieldName = '';
    const formElements = Array.from(event.target.elements);
    console.log(formElements);
    formElements.map((element, index) => {
      switch (element.type) {
        // ignore the submit button
        case 'submit':
          return;
          break;

        default:
          // set form state for aria-invalid
          setIsFormDirty(false);

          // test the input length to see if empty
          if (element.value.trim().length === 0) {
            // focus on first empty input when submitted
            // initial state is null, if false then it cannot reset the index.
            // thus it stays on the first index it finds.
            if (firstEmptyElementIndex === null) {
              firstEmptyElementIndex = index;
              fieldName = element.labels[0].textContent.toLowerCase();
              inputRefs.current[index].focus();
            }
            setErrorAnnouncement(`Required fields cannot be empty. Please enter ${fieldName}`);
          }
          break;
      }
    });

    // thoughts: mine is more compact, but hers is more complete.
    // Hers accounts the submission and setErrorAnnouncement.
  };

  const changeHandler = (event) => {
    const changeTarget = event.target;
    const changeValue = changeTarget.type === 'checkbox' ? changeTarget.checked : changeTarget.value;
    const id = changeTarget.id;

    setIsFormDirty(true);
    setFormState((prevState) => {
      return {
        ...prevState,
        ...{
          [id]: changeValue,
        },
      };
    });
  };

  return (
    <BodyClassName className="header-overlap page-submit-listing">
      <>
        <HeaderPortal>
          <h1 className="visually-hidden">CampSpots</h1>
        </HeaderPortal>
        <section aria-labelledby="heading-about-1">
          <header className="page-header">
            <div className="page-header-content layout">
              <h2 className="primary-heading h1-style" id="heading-about-1">
                Submit Your Spot
              </h2>
            </div>
          </header>
          <article className="form-wrap">
            <div className="layout">
              <h3>Got a camping spot our community would enjoy? Tell us about it!</h3>
              <form
                action=""
                aria-describedby="key"
                className={!isFormDirty ? `dirty` : ``}
                onSubmit={(event) => submitHandler(event)}
              >
                <p className="error" role="alert" aria-relevant="all">
                  {errorAnnouncement}
                </p>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="submittername">
                      Your name{' '}
                      <span className="asterisk" abbr="required" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      aria-required="true"
                      aria-invalid={isFormSubmitted && formState.submittername.length === 0 ? 'true' : null}
                      type="text"
                      id="submittername"
                      data-name="name"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">
                      Your email address{' '}
                      <span className="asterisk" abbr="required" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      aria-required="true"
                      aria-invalid={isFormSubmitted && formState.email.length === 0 ? 'true' : null}
                      type="email"
                      id="email"
                      data-name="email"
                      //   pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                </div>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="sitename">
                      Site Name{' '}
                      <span className="asterisk" abbr="required" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      aria-required="true"
                      aria-invalid={isFormSubmitted && formState.sitename.length === 0 ? 'true' : null}
                      type="text"
                      id="sitename"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">
                      Location{' '}
                      <span className="asterisk" abbr="required" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      aria-required="true"
                      aria-invalid={isFormSubmitted && formState.location.length === 0 ? 'true' : null}
                      type="text"
                      id="location"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                </div>
                <div className="two-parts-50-50">
                  <div className="form-field">
                    <label htmlFor="fee">Nightly fee</label>
                    <input
                      type="number"
                      id="fee"
                      placeholder="$"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="ownership">
                      Can the public legally camp here?{' '}
                      <span className="asterisk" abbr="required" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      aria-required="true"
                      type="checkbox"
                      id="ownership"
                      name="ownership"
                      value="Owned"
                      onChange={(event) => changeHandler(event)}
                      ref={(elementRef) => {
                        inputRefs.current.push(elementRef);
                      }}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    aria-invalid={isFormSubmitted && formState.notes.length === 0 ? 'true' : null}
                    id="notes"
                    onChange={(event) => changeHandler(event)}
                    ref={(elementRef) => {
                      inputRefs.current.push(elementRef);
                    }}
                  ></textarea>
                </div>
                <p id="key" className="asterisk">
                  * Fields are required.
                </p>
                <div className="form-submit">
                  <button className="btn-submit">Submit</button>
                </div>
              </form>
            </div>
          </article>
        </section>
      </>
    </BodyClassName>
  );
};

export default SubmitListingPage;
