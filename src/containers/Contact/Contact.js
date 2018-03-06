import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Contact.css';
import NameIcon from '../../assets/svg/NameIcon/NameIcon';
import MailIcon from '../../assets/svg/MailIcon/MailIcon';
import SubmitIcon from '../../assets/svg/SubmitIcon/SubmitIcon';
import TipPopUp from '../../components/UI/TipPopUp/TipPopUp';
import Input from '../../components/UI/Input/Input';

class Contact extends Component{
    state = {
      formData: {
        name: {
                value: '',
                valid: false,
                touched: false,
                elementConfig: {
                  type: 'text',
                  required: 'required',
                  placeholder: 'name*'
                },
                validation: { required: true }
              },
        email: {
                value: '',
                valid: false,
                touched: false,
                elementConfig: {
                  type: 'email',
                  required: 'required',
                  placeholder: 'email*'
                },
                validation: { required: true, email: true }
              },
        message: {
                  value: '',
                  valid: true,
                  touched: false,
                  elementConfig: {
                    placeholder: 'message',
                    type: 'text'
                  },
                  validation: {}
                }
      },
      formDataArr: [],
      formIsValid: false
    }
    componentDidMount(){
      this.generateFormDataArr();
    }
    generateFormDataArr(){
      let currentLang = this.props.selectedLanguage;
      let contact = this.props.pfolioData[currentLang].menu.Contact;
      let formDataArr = [];
      for (let key in this.state.formData){
        let data = { ...this.state.formData[key] }, updatedData = {};
            contact[key] && (updatedData = { ...data, ...contact[key] });
            updatedData.key = key;
        formDataArr.push(updatedData);
      };
      this.setState({ formDataArr: formDataArr });
    }
    validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
    checkValidity(value, validation){
      let isValid = true;
      if (validation && validation.required){
        isValid = value.trim() !== '' && isValid;
      }
      if (validation && validation.email){
        isValid = this.validateEmail(value);
      }
      return isValid;
    }
    inputChangeHandler = (event, index) => {
      let updFormDataArr = [ ...this.state.formDataArr ];
      let updatedData = { ...updFormDataArr[index] };
      updatedData.value = event.target.value;
      updatedData.valid = this.checkValidity(updatedData.value, updatedData.validation);
      updatedData.touched = true;
      updFormDataArr[index] = updatedData;
      let isValid = true;
      updFormDataArr.forEach((data) => {
        isValid = data.valid && isValid;
      })
      this.setState({ formDataArr: updFormDataArr, formIsValid: isValid })
    }
    setIconComponent = (key, formIsValid) => {
        switch (key) {
          case 'name':
            return <div className={classes.IconWrp}><NameIcon /></div>;
          case 'email':
            return <div className={classes.IconWrp}><MailIcon /></div>;
          case 'message':
            return <button disabled={!formIsValid} className={classes.IconWrp}><SubmitIcon /></button>;
          default: return null;
        }
    }
    render(){
      let currentLang = this.props.selectedLanguage;
      let contact = this.props.pfolioData[currentLang].menu.Contact, inputs;

      if (this.state.formDataArr){
            inputs = this.state.formDataArr.map((form, index) => {
            let inputClasses = [classes.Input];
            !form.valid && form.touched && (inputClasses = [classes.Input, classes.InputFail])
            let iconComponent = this.setIconComponent(form.key, this.state.formIsValid);
            return  (<div
                      className={classes[form.key]}
                      key={index}>
                      <Input
                        classes={inputClasses.join(' ')}
                        elementConfig={form.elementConfig}
                        inputChange={(event) => {this.inputChangeHandler(event, index)}}/>
                      {iconComponent}
                      <TipPopUp classes={classes} topInfo={form.translate} bottomInfo={form.tip} />
                    </div>)
        })
      }

      return (
        <div className={classes.ContactWrp}>
          <h2 className={classes.Preface}>{contact.preface}</h2>
          <form  className={classes.FormWrp}>
            {inputs}
          </form>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
      pfolioData: state.dataReducer.pfolioData,
      selectedLanguage: state.dataReducer.selectedLanguage
    }
}

export default connect(mapStateToProps, null)(Contact);
