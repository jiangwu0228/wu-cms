# School_CMS

### Set up

##### Project located in fold school_cms

Framework : Next js

UI: antd

Style : styled-components

Api : axios

CMS api:

https://www.showdoc.com.cn/1162959773489609

https://cms.chtoma.com/swagger/

Sample :

https://cms-lyart.vercel.app/

username: [manager@admin.com](mailto:manager@admin.com)

https://github.com/chtocode/CMS / Do not copy this code

My project

https://github.com/kasituna/wu-cms

https://school-cms-sigma.vercel.app/

##### Each class document in fold "chapter"

My note book located here

###### Road Map



###### Problem

# can't set layout stictly

​	add code below

```
position: "sticky",

top: 0,
```

set up dev env

build login page

How can we make standardization, is there any document?

Such as which should be abstract? Which should be in separate file.

router redirect check token

can use if statements to do diff role

Sort

data save in local or just got 10?

Local storage router.quere

"data-fns" to format data



### Do we need useMemo and useCallback?

###### Which situation will re-render component?

1. Component  state change 

2. Props from parent component change
3. Parent component re-render

###### useMemo scenario

if we do have complex calculate that we can call useMemo caching this.

Only if dependency change that will re-calculate instaad fo every re-render component

###### useCallback scenario

1. Child component will re-render every time if we don't use useCallback when we need pass function to child component.
2. when we need debounce and throttle



##### Personal point of view

Use that hooks when we need high performance.



When I click add button all page will re-render

After I add one and click the last page button, will say error.

if it's not server error or we can say backend give some error can use if else alert err

import "antd/dist/antd.css";

Intercerpter

// 17/ Nov 2021
all course tab:
1. A new function (AllCourses) return a List with antd component.
2. Add api get all course with page and limit.
3. Fatch data in AllCourses.
4. Bulid single course card component.
5. Render courseCard component and inject to every single course card component.
6. Add infinite scroll feature.

problems:
1. use Link in cuursesCard component will throw error.


// 18/ Nov 2021
course detail tab:
1. A new file [id].
2. Get id from url or server.
3. Fatch data in CourseDetail.
4. Build courseDetail component.
5. Render and inject data to courseDetail component.

problems:
1. semms like we can't use Object.forEntries in calender component.

// 22/ Nov 2021
1. add course tab use steps component 
2. add manipulationCourse form component.

problems:
1. delete teacher will show error.
2. adjust textarea height will cover alert.
3. dose error will re-render? 429 error?
4. inputgroup disable the function of inner input.

//14/ Dec 2021
1. 6 component in overview tab, so build framework for that.
2. write method to get data from server and wrap it in a useEffect.
3. build single antd card component, and loop it as 3 card and inject data.
4. same ad above component.

problems:
1. response data was undefined in first time.(fixed)(use && make sure that have data)
