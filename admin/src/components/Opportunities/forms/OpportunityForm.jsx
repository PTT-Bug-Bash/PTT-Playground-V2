// import node modules
import { useState , useEffect} from 'react';

// import models
import { opportunity } from '../../../models/db_models';

// import routes
import addOpportunity from "../../../routes/campaign/addOpportunity";
import getBusinesses from "../../../routes/business/getBusinesses";

// import style
import '../../../assets/style/index.css';

function OpportunityForm({ brandID }) {
  const [formData, setFormData] = useState(opportunity);
  const [successMessage, setSuccessMessage] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("none");
  const [defaultImage , setDefaultImage] = useState("https://kodilan.com/img/empty-company-logo.8437254b.png");

  const [checking, setChecking] = useState({
    "title": 0,
    "description": 0,
    "event_type": 0,
    "sports": 0,
    "payment_type": 0
  });

  //fetch data entries from database
  useEffect(() => { 
    const fetchData = async () => {
        const dataB = await getBusinesses();
        setBrands(dataB);
    };
    fetchData();
  }, []);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
      
    // Update the checking state properly
    setChecking(prev => ({
      ...prev,
      [name]: 1
    }));

    // Update the specific field in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      opportunity: {
        ...prevFormData.opportunity,
        [name]: value,
      },
    }));
  };

  const handleBrand = (event) => {
    setSelectedBrand(event.target.value);
    console.log('Selected brand ID:', event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if (brandID === null) {brandID = selectedBrand}
    if (brandID !== "none" && Object.values(checking).every(value => value === 1))
    {
      setChecking(prev => ({
        ...prev,
        ["title"]: 0,
        ["description"]: 0,
        ["event_type"]: 0,
        ["sports"]: 0,
        ["payment_type"]: 0,
      }));
      formData.opportunity.business_id = brandID;
      console.log("Submittng...");
      if (formData.opportunity.icon_image === "") {formData.opportunity.icon_image = defaultImage}
      addOpportunity(formData.opportunity)
        .then(() => {
          window.alert("You successfully submitted an Opportunity");
          setSuccessMessage('Successfully submitted an Opportunity!');
          setTimeout(() => {
            setSuccessMessage('');  // Clears the success message after 6000 milliseconds (3 seconds)
          }, 6000);
          // Optional: Reset form fields here if needed
          setFormData(opportunity);
        })
        .catch(error => {
          console.error("Error adding opportunity:", error);
          setSuccessMessage('Failed to submit opportunity.');
          setTimeout(() => {
          setSuccessMessage('');  // Also clear error message after some time
          }, 6000);
        });
    }
    else {
      window.alert("Please Fill out the Required Fields...");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <form className="mt-4" onSubmit={handleSubmit}>

          {brandID === null && 
          <div className="mb-4">
          <label htmlFor="brands" className="block text-black-600 text-left">
                      Select your brand<span className="text-red-500">*</span>
          </label>
          <select id="brands" name="brands" onChange={handleBrand} value={selectedBrand} required>
              <option value="none" disabled>Select brand</option>
              {brands.map((item) => (
                  <option key={item.id} value={item.id}>{item.business_name}</option>
              ))}
          </select>
          </div>}

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
                value={formData.opportunity.icon_image}
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
                value={formData.opportunity.title}
                required
            />
          </div>
          <div className="mb-4">
          <label
              htmlFor="description"
              className="block text-black-600 text-left"
          >
              Description<span className="text-red-500">*</span>
          </label>
          <input
              onChange={handleTextChange}
              type="text"
              id="description"
              name="description"
              className="w-full p-2 border rounded-md"
              placeholder='Description...'
              value={formData.opportunity.description}
          />
          </div>
          <div className="mb-4">
          <label
              htmlFor="event_type"
              className="block text-black-600 text-left"
          >
              Type of Event<span className="text-red-500">*</span>
          </label>
          <input
              onChange={handleTextChange}
              type="text"
              id="event_type"
              name="event_type"
              className="w-full p-2 border rounded-md"
              value={formData.opportunity.event_type}
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
                value={formData.opportunity.sports}
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
              value={formData.opportunity.payment_type}
              required
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

export default OpportunityForm;
