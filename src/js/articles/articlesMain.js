import React from 'react';
import Levenshtein from 'levenshtein';

import contactDOM from './contactDOM';
import defaultDOM from './defaultDOM';
import educationDOM from './educationDOM';
import photographyDOM from './photographyDOM';
import projectsDOM from './projectsDOM';
import profileDOM from './profileDOM';
import workDOM from './workDOM';
import skillsDOM from './skillsDOM';

function fuzzyKey(inpString, keys) {
    let smallestDistance = Number.MAX_SAFE_INTEGER;
    let smallestKey = '';
    keys.forEach(key => {
        const distanceObj = new Levenshtein(inpString.toLowerCase(), key.toLowerCase());
        const distance = distanceObj.distance;

        if (distance < smallestDistance) {
            smallestDistance = distance;
            smallestKey = key;
        }
    });

    if (smallestDistance < 3) {
        return smallestKey;
    }
    return null;
}

class Articles {
    constructor() {
        this.articles = {
            'Education': educationDOM,
            'Contact': contactDOM,
            'Profile': profileDOM,
            'Photography': photographyDOM,
            'Projects': projectsDOM,
            'Work': workDOM,
            'Skills': skillsDOM
        }
    }

    fuzzyGetDOMfunc(testString) {
        const key = fuzzyKey(testString, this.getAllKeys());
        if (!key) {
            return defaultDOM;
        }

        return this.articles[key];
    }

    getAllKeys() {
        return Object.keys(this.articles);
    }

    allDOM() {
        return this.getAllKeys().map(key => {
            return <div key={key}>
                {this.articles[key]()}
            </div>
        });
    }
}

export default Articles;