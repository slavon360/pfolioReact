import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Contact.css';
import NameIcon from '../../assets/svg/NameIcon/NameIcon';
import MailIcon from '../../assets/svg/MailIcon/MailIcon';
import SubmitIcon from '../../assets/svg/SubmitIcon/SubmitIcon';
import TipPopUp from '../../components/UI/TipPopUp/TipPopUp';
import Input from '../../components/UI/Input/Input';
import Preloader from '../../components/UI/Preloader/Preloader';
import Success from '../../components/UI/Success/Success';
import Fail from '../../components/UI/Fail/Fail';
//import SubmitedData from '../../components/SubmitedData/SubmitedData';

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
      formIsValid: false,
      clientData: null
    }
    componentDidMount(){
      this.generateFormDataArr();
      //this.setState({ clientForms: this.state.clientForms.concat(this.props.clientData) });
      //this.props.clientData && this.setState({ showSuccessFail: false });
      console.log('componentDidMount', this.props.clientData, this.state)
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
        isValid = this.validateEmail(value) && isValid;
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
    clientFormHandler = (event) => {
      event.preventDefault();
      let formData = {};
      this.state.formDataArr.forEach((data) => {
        formData[data.key] = data.value;
      });
      this.state.clientData && this.setState({ clientData: null }, () => {
        this.props.onClientFormHandler(formData);
      });
      !this.state.clientData && this.props.onClientFormHandler(formData);
    }
    dropFormValues = () => {
      let droppedFormArr = [ ...this.state.formDataArr ];
      droppedFormArr = droppedFormArr.map((data) => {
        return {
          ...data,
          value: ''
        }
      })
      console.log('dropFormValues')
        this.setState({ formDataArr: droppedFormArr, clientData: this.props.clientData });
    }
    componentDidUpdate(){
      this.props.clientData && !this.state.clientData && this.dropFormValues();
    }
    componentWillUnmount(){
      this.setState({ clientData: null }, () => {
        console.log('componentWillUnmount', this.state.clientData)
      });
      //console.log('componentWillUnmount')
    }
    render(){
      let currentLang = this.props.selectedLanguage;
      let contact = this.props.pfolioData[currentLang].menu.Contact, inputs, help;
      let preloader = this.props.loading ? <Preloader /> : null;
      let feedback;
          this.props.showSuccess && (feedback = <Success info={contact.success}/>);
          this.props.showFailure && (feedback = <Fail error={this.props.error}/>);

      if (this.state.formDataArr){
            inputs = this.state.formDataArr.map((form, index) => {
              let inputClasses = [classes.Input];
              let helpEmailClasses = [classes.HelpEmail, classes.HelpEmailHide];
              let iconComponent = this.setIconComponent(form.key, this.state.formIsValid);
              !form.valid && form.touched && (inputClasses = [classes.Input, classes.InputFail]);
              form.touched && !form.valid && (helpEmailClasses = [classes.HelpEmail, classes.HelpEmailShow])
              help = form.validation.email ? <div className={helpEmailClasses.join(' ')}>{form.help}</div> : null;
              return  (<div
                        className={classes[form.key]}
                        key={index}>
                         {help}
                        <Input
                          classes={inputClasses.join(' ')}
                          value={form.value}
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
          <form onSubmit={this.clientFormHandler} className={classes.FormWrp}>
            {inputs}
          </form>
            {feedback}
            {preloader}
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
      pfolioData: state.dataReducer.pfolioData,
      selectedLanguage: state.dataReducer.selectedLanguage,
      clientData: state.dataReducer.clientData,
      loading: state.dataReducer.loading,
      showSuccess: state.dataReducer.showSuccess,
      showFailure: state.dataReducer.showFailure,
      error: state.dataReducer.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onClientFormHandler: (clientData) => { dispatch(actions.submitClientData(clientData)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
