Insights
Description
App Analytics are siloed, there is no way for you to know get insights into your competition's app. Insights leverages the android accessibility API to get you all the metrics you want to track in any 3rd party app.

Use cases
As a PM at snapdeal, you want to know if the new chat feature in Flipkart is successful. While you can conduct paid surveys - those generally fail to record user behaviour accurately. Insights allows you to run survey to track usage of chat feature on real android devices, without requiring any user intervention. So, as a PM you better spend your team's time.
As UI/UX developer you want to know which date widget is more effective. Insights allows you to run surveys on our platform - to get insights into data widget usage patterns.
Survey Schema

```javascript
{
	"Survey-id": "survey"
	"event_type": "instant", // interval
	 // For interval based events - start_trigger, stop_trigger
	"Event_trigger": {
	"On_action" : "click",
	"Resource_id": "add_to_cart",
	"Package_name": "com.flipkart.android",
	"Activity": {
// identifying app screen here
"Contains_text": ["ratings", "reviews", "description", "ratings"],
		"Contains_id": ["add-to-cart", "favorite-flipkart",]
}
},
"Parameters": [
	{
"Type": "Integer",
"Name": "price",
"Resource-id": "flipkart-price"
},
{
"Type": "Float",
"Name": "rating",
"Resource-id": "rating"
}
],
 }

Datapoint Schema
{
	"Survey_id": "f23bea784aef729",
	"Start_time": <timestamp>,
"User-data": {
	"Id": "b4168aed127012ef" // unique user device identifier
	"Age": 20,
	"Phone-model": "",
	"Phone",
	"Cellular or wifi"
},
Params : {
	"Price": 50,
	"Rating": 3.4
}
}
```javascript

App Flow
Accessibility Service
Read survey file (surveys.json) and create in memory data structure
For each accessibility event (needs to be quick!)
Get current active app
If event trigger exists for active app
Run rules
Extract data
Send information to backend (possibly in background worker - queue requests)
Main app
Update surveys file
Installed apps?

Backend

API Endpoint
Have ES index for each survey
Index datapoint into appropriate survey index
User data?
other

Frontend
Landing page
Login/Signup
Account home
Dashboard 
showing active surveys
Edit Survey
Survey Dashboard
Visualization on active dashboard
Create Survey
Form to create survey schema
