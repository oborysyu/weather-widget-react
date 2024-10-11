import { CButton, CContainer, CForm, CFormInput, CFormLabel } from '@coreui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import useCityStore from '../hooks/useCityStore';

function CityForm() {
    const { city } = useCityStore(
        useShallow((state) => ({ city: state.city })),
    )
    const updateCity = useCityStore((state) => state.updateCity);
    const [inputCity, setCity] = useState<string>(city);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateCity(inputCity);
    }
    return (
        <CForm onSubmit={handleSubmit} className="px-4 py-4" >
            <div className="mb-3">
                <CFormLabel className="d-flex justify-content-center" htmlFor="cityinput">City</CFormLabel>
                <CFormInput required type="text" id="cityinput" placeholder="Enter the city you would like to receive the weather forecast on." value={inputCity} onChange={handleInputChange} />
            </div>
            <CContainer className="d-flex justify-content-center">
                <CButton color="primary" type="submit" disabled={inputCity.length === 0}>Get weather</CButton>
            </CContainer>
        </CForm>
    )
}

export default CityForm;