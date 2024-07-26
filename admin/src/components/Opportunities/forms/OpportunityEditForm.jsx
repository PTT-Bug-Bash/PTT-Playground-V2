// import node modules
import { useState } from 'react';

// import routes
import updateOpportunity from "../../../routes/campaign/updateOpportunity"

// import styles
import '../../../assets/style/index.css';

function OpportunityEditForm(props) {
  const { opportunityItem, onSubmit } = props;
  const [formData, setFormData] = useState(opportunityItem);
  const [successMessage, setSuccessMessage] = useState('');
 
  const handleTextChange = (event) => {
    const { name, value } = event.target;

    // Update the specific field in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
        [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    updateOpportunity(formData)
      .then(() => {
        onSubmit();
      })
      .catch(error => {
        console.error("Error adding opportunity:", error);
        setSuccessMessage('Failed to submit opportunity.');
        setTimeout(() => {
        setSuccessMessage('');  // Also clear error message after some time
        }, 6000);
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
        <form className="mt-4" onSubmit={handleSubmit}>
      

            <div className="mb-4">
            <label htmlFor="icon_image" className="block text-black-600 text-left">
                Opportunity Image
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="icon_image"
                name="icon_image"
                className="w-full p-2 border rounded-md"
                placeholder='https://...'
                value={formData.icon_image === "https://kodilan.com/img/empty-company-logo.8437254b.png"? "" : formData.icon_image}
            />
            <p className="text-gray-600 text-sm">
               Enter a URL to your image like: https://unsplash.it/245/150?gravity=center
            </p>
            </div>
            
            <div className="mb-4">
            <label
                htmlFor="title"
                className="block text-black-600 text-left"
            >
                Title<span className="text-red-500">*</span>
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border rounded-md"
                placeholder='Title...'
                value={formData.title}
                required
            />
            </div>

            <div className="mb-4">
            <label
                htmlFor="description"
                className="block text-black-600 text-left"
            >
                Description
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="description"
                name="description"
                className="w-full p-2 border rounded-md"
                value={formData.description}
                placeholder='Description...'
            />
            </div>

            <div className="mb-4">
            <label
                htmlFor="event_type"
                className="block text-black-600 text-left"
            >
                Type of Event
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="event_type"
                name="event_type"
                className="w-full p-2 border rounded-md"
                value={formData.event_type}
                placeholder='Event...'
            />
            </div>
            

            <div className="mb-4">
            <label htmlFor="sports" className="block text-black-600 text-left">
                Athlete Qualifications<span className="text-red-500">*</span>
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="sports"
                name="sports"
                className="w-full p-2 border rounded-md"
                placeholder='Soccer, Football, Tennis...'
                value={formData.sports}
                required
            />
            </div>

            <div className="mb-4">
            <label htmlFor="payment_type" className="block text-black-600 text-left">
                Athlete Compensation<span className="text-red-500">*</span>
            </label>
            <input
                onChange={handleTextChange}
                type="text"
                id="payment_type"
                name="payment_type"
                className="w-full p-2 border rounded-md"
                placeholder='Compensation...'
                value={formData.payment_type}
            />
            </div>
            <p className="text-gray-600 text-sm">
               {successMessage}
            </p>
            <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover-bg-green-700"
            onClick={handleSubmit}
            >
            SUBMIT
            </button>
        </form>
    </div>
  );
}

export default OpportunityEditForm;
