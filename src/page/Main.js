import { useState } from 'react';
import MainComponent from '../component/main-component';
import Footbar from '../Footbar';
import Headbar from '../Headbar';


export default function Main() {
    return (
        <div>
            <Headbar />
            <MainComponent />
            <Footbar />
        </div>
    )
}