import React from 'react'

export default (props) => {

        // State for form data
        const [formData, setFormData] = React.useState(props.initial);
 
        // Data updates when state changes
        React.useEffect(()=> {
            setFormData(props.initial)
        }, [props.initial])
    
        const handleChange = (event) => {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        };
    
        return (
            <>
            <div className="form">
            <input 
                type="text" 
                name="title" 
                value={formData.title}
                onChange={handleChange}
                placeholder="Name"/>
            <input 
                type="text" 
                name="url"  
                value={formData.url}
                onChange={handleChange}
                placeholder="http://"/>
            <button 
            className={props.formType === 'edit' ? 'edit-button' : 'add-button'}
            onClick={() => {
                props.handleSubmit(formData);
                // setFormData(props.initial)
            }}
                >
                    {props.formType === 'edit' ? 'EDIT' : 'ADD'}
                </button>
                </div>
            </>
        )
}