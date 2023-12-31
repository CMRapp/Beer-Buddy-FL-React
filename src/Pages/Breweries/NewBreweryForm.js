import React, {useState, useEffect} from 'react';
import { Form, Modal, ModalBody, 
    ModalFooter, ModalHeader, ModalTitle, Button } from 'react-bootstrap';
import axios from 'axios';

import './breweries.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons'

//NewBeerForm is a functional (stateless) component | recieves props
export function NewBreweryForm ({fetchData}) {
    
    const [name, setName] = useState(''); 
    const [logoURL, setLogoURL] = useState('');
    const [website, setWebsite] = useState('');
    const [address1, setAddress1] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [dateAdded, setDateAdded] = useState(new Date());
    
    //Define endpoint URL
    const Endpoint = 'https://64bedc3b5ee688b6250d0246.mockapi.io/breweries';

    //useEffect prepares page for rendering | Calls fetchData()
    useEffect(() => {
        fetchData();
      }, [Endpoint]);
    
    ///modal handling
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };

   
   //function to new brewery
    async function addNewBrewery () {

        //validate inputs are not blank
        if (name && logoURL && website && address1 && city && zip && facebook && twitter && instagram ) {             
            //if valid input, try adding brewery
            try {
                const newBrewery = {name, logoURL, website, address1, city, zip, facebook, twitter, instagram};
                const resp = await axios.post(Endpoint, newBrewery);
            } catch (error) {
                console.log("Error adding Brewery! ", error);
            }
                setName('');                                //reset form inputs for good UX
                setWebsite('');
                setAddress1('');
                setCity('');
                setZip('');
                setFacebook('');
                setTwitter('');
                setInstagram('');
                hideModal();                                //close the modal
                fetchData();                                //refresh the data
                
        //if fields are empty, log error
        } else {
            console.log('All fields must be completed');
        };        
    }

   return (
    <>
        <Modal
            show={isOpen}
            onHide={hideModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description' 
            centered
        >
            <ModalHeader>
                <ModalTitle>ADD A NEW BREWERY</ModalTitle>
            </ModalHeader>
            
            <ModalBody>
                <p>Thanks for taking the time to add a new Florida Brewery to our database! Please use the form below to enter your information.</p>
                <Form>
                    <Form.Control 
                        type='text'
                        placeholder = 'Brewery Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    
                    <Form.Control 
                        type='text'
                        placeholder = 'Enter Logo URL'
                        onChange={(e) => setLogoURL(e.target.value)}
                        value={logoURL}
                    />

                    <Form.Control 
                        type='text'
                        placeholder = 'Website URL'
                        onChange={(e) => setWebsite(e.target.value)}
                        value={website}
                    />

                    <Form.Control 
                        type='text'
                        placeholder = 'Street Address (Include suite number, if applicable)'
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                    />

                    <Form.Control  
                        type='text'
                        placeholder = 'City'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />

                    <Form.Control  
                        type='text'
                        placeholder = 'Zipcode'
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                    />

                    <Form.Control  
                        type='text'
                        placeholder = 'Facebook URL'
                        onChange={(e) => setFacebook(e.target.value)}
                        value={facebook}
                    />

                    <Form.Control  
                        type='text'
                        placeholder = 'Twitter (X) URL'
                        onChange={(e) => setTwitter(e.target.value)}
                        value={twitter}
                    />

                    <Form.Control  
                        type='text'
                        placeholder = 'Instagram URL'
                        onChange={(e) => setInstagram(e.target.value)}
                        value={instagram}
                    />
                
                </Form>
            </ModalBody>
            
            <ModalFooter>
                <Button variant='warning' onClick={addNewBrewery}>Add Brewery <FontAwesomeIcon icon={faBeerMugEmpty}/></Button>
                <Button variant='secondary' onClick={hideModal}>Cancel</Button>    
            </ModalFooter>
        </Modal>
        <Button variant='danger' onClick={showModal}>Add A Brewery <FontAwesomeIcon icon={faBeerMugEmpty}/></Button>     
    </>
   );
}