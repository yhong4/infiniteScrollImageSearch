import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import {debounce} from 'lodash';

const unsplash = new Unsplash({accessKey: "ced7680e54b81cd6c74ef98e82b065eb988694d4e5b9bdfef84e56111cb60ea4"});

export default class ImageSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '',
            images:[],
            page: 1,
            isLoading:false
        }

        window.onscroll = debounce(() => {
            const {isLoading} = this.state;
            
            if(isLoading){
                return;
            }

            if(window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
                ){
                    this.setState({isLoading:true}, () => this.loadImg());
                }
        }, 500)
    }

    loadImg = () => {
        unsplash.search.photos(this.state.keyword, this.state.page, 10).then(toJson).then(
            json => {
                this.setState(prevState => {
                    return {
                        images: [ ...prevState.images, ...json.results ], 
                        page: prevState.page + 1,
                        isLoading: false
                    }
                })
            })
    }

    OnClickSearchButton = () => {
        unsplash.search.photos(this.state.keyword, 1, 10).then(toJson).then(
            json => this.setState({
                images:json.results,
                page:2,
                isLoading:false
            })
        )
    }

    setKeywordValue = debounce(e => {
        this.setState({
            keyword: e
        })
    },300)

    onInputValueChange = (e) => {
        this.setKeywordValue(e.target.value)
    }
    render() {
        return(
            <>
                <input onChange={this.onInputValueChange} />
                <button onClick={this.OnClickSearchButton} >Search</button>
                <div id="img-container">
                    {
                        this.state.images.length > 0 ? 
                        this.state.images.map(image => {
                            return(
                                <img alt="no img" height={image.height/10} width={image.width/10} src={image.urls.regular} key={image.id}/>
                            )
                        }) :
                        null
                    }
                </div>
                <div>
                    {
                        this.state.isLoading ? "Loading..." : ""
                    }
                </div>
            </>
        )
    }
}