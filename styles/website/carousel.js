import {makeStyles} from '@mui/styles'
const useStyles = makeStyles({
	banner: {
	 height: 400,
	 position: relative,
	},
 bannerMedia:{
	 backgroundColor: white,
	 height: '100%',
	 overflow: hidden,
	 position: relative,
	 transition: '300ms',
	 cursor: pointer,
},
 bannerMediaMediaCaption: {
	 textOverflow: ellipsis,
	 position: absolute,
	 bottom: 0,
	 padding: 15,
	 backgroundColor: black,
	 color: white,
	 opacity: 0.6,
	 width: '100%',
	 height: '10%',
	 fontSize: 21,
	 fontWeight: 200,
	 transition: '300ms',
	 cursor: pointer,
},
 bannerMediaMediaCaptionHover: {
	 opacity: 0.8,
},
 bannerMediaHover: {
	 filter: brightness('115%'),
},
 bannerBannerGrid: {
	 height: '100%',
	 position: relative,
},
 bannerContent: {
	 color: white,
	 backgroundColor: '#771818',
	 height: '100%',
	 position: relative,
	 cursor: pointer,
	 padding: 30,
	 transition: '300ms',
},
 bannerContentHover:{
	 backgroundColor: "#571111",
},
 bannerContentActive: {
	 backgroundColor: "#571111",
},
 bannerContentViewButtonHover: {
	 backgroundColor: '#f1f1f1',
	 color: '#771818',
},
 bannerContentViewButtonActive: {
	 backgroundColor: "#f1f1f1",
	 color: "#771818",
},
 bannerContentTitle: {
	 fontSize: 30,
	 fontWeight: 500,
	 color: white,
},
 bannerContentCaption: {
	 marginTop: 10,
	 fontSize: 15,
	 color: white,
},
 bannerContentViewButton: {
	 marginTop: 40,
	 color: white,
	 fontSize: 25,
	 border: 3 && solid && white,
	 textTransform: capitalize,
	 transition: "200ms",
}
 })
 export default useStyles