import React, { Component } from 'react';
/* connect function:connects the component to the store and the action creator we create. 
Hooks up two function to react component.*/
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';


/*Redux Store
An action creator (the function) which returns the javascript action or return a javascript object.
function() {
    return
     The action is a javascript object itself. 
     type tells redux what kind of action is being performed. payload a key that holds all the data 
   or some other key that holds all the necessary info w/in the javaScript object which will use an action to update the store 
    {
        type: 'ADD_REMINDER',
            payload: 
    }
}
*/

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
        }
    }

    //check to see if the state which is "text" is set
    addReminder() {
        console.log('this.state.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }



    renderReminders() {
        // go looking into the object on the right hand side of the equals and find the key that is in the {} and return it's value.
        const { reminders } = this.props; 
        let dateTextColor = '';
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        let agendaItemDueDate = moment(new Date(reminder.dueDate)).fromNow();

                        if (agendaItemDueDate.includes("ago")) {
                            dateTextColor = "past_event";
                        } else {
                            dateTextColor = "future_event";
                        }

                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div className={dateTextColor}><strong>{agendaItemDueDate}</strong></div>
                                </div>

                                <div className="list-item delete-button"
                                    onClick={() => this.deleteReminder(reminder.id)}>
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        return (
            <div className="App">
                <div className="title"
                >My Agenda
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Needs to be completed..."
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <input className="form-control"
                            type="datetime-local"
                            onChange={event => this.setState({ dueDate: event.target.value })}
                        />
                    </div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => this.addReminder()}
                    >
                        Add to Agenda
                    </button>
                </div>
                {this.renderReminders()}

                <div>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => this.props.clearReminders()}
                    >

                        Clear Agenda
                    </button>
                </div>
            </div>
        )
    }

}



function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
/*binds the action creator or creators created to the overall dispatch function through out the application.
 Makes it accessible as props in this specific component when the connect feature is called
function mapDispatchToProps(dispatch) {
 return bindActionCreators({addReminder}, dispatch);
}

export default connect(null, mapDispatchToProps) (App);*/