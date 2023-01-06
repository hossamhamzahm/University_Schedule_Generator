var coursecode = "";
var allcourses = [];
var sections = [];
var student;
var send;
var httpRequest = new XMLHttpRequest();
var token;
var section_name;
var section_type;
$("#courseslink").click(function (e) {
	$("#courses").removeClass("d-none");
	$("#sections").addClass("d-none");
	$(".loginadmin").addClass("d-none");
	$(".loginstudent").addClass("d-none");
	$(".reg").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#sectionsedit").addClass("d-none");

	displaycourses();
});
$("#adminlogin").click(function (e) {
	$("#courses").addClass("d-none");
	$("#sections").addClass("d-none");
	$(".loginadmin").removeClass("d-none");
	$(".loginstudent").addClass("d-none");
	$(".reg").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#sectionsedit").addClass("d-none");
});
$("#studentlogin").click(function (e) {
	$("#courses").addClass("d-none");
	$("#sections").addClass("d-none");
	$(".loginadmin").addClass("d-none");
	$(".loginstudent").removeClass("d-none");
	$(".reg").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#sectionsedit").addClass("d-none");
});
$("#register").click(function (e) {
	$("#courses").addClass("d-none");
	$("#sections").addClass("d-none");
	$(".loginadmin").addClass("d-none");
	$(".loginstudent").addClass("d-none");
	$(".reg").removeClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#sectionsedit").addClass("d-none");
});
$(".upbtn").click(function (e) {
	student = {
		student_username: document.querySelector(".usr").value,
		f_name: document.querySelector(".fname").value,
		m_name: document.querySelector(".mname").value,
		l_name: document.querySelector(".lname").value,
		student_major: document.querySelector(".major").value,
		student_password: document.querySelector(".pass").value,
	};
	send = {
		student: student,
	};
	send = JSON.stringify(send);

	registeruser(send);
});
function registeruser(send) {
	httpRequest.open("POST", `http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/signup`);
	console.log(send);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.send(send);
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			console.log(httpRequest.response);
		}
	});
}
$(".signinbtn").click(function (e) {
	student = {
		student_username: document.querySelector(".username").value,
		student_password: document.querySelector(".userpassword").value,
	};
	send = {
		student: student,
	};
	send = JSON.stringify(send);

	httpRequest.open("POST", `http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/login`);
	console.log(send);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.send(send);
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			if (JSON.parse(httpRequest.response).AccessToken) {
				token = JSON.parse(httpRequest.response).AccessToken;
				$(".navcoursesedit").removeClass("d-none");
				$("#logout").removeClass("d-none");
				$(".navcourses").removeClass("d-none");

				$(".navlogin").addClass("d-none");
				$("#register").addClass("d-none");
				$(".loginadmin").addClass("d-none");
				$(".loginstudent").addClass("d-none");
			}
		}
	});
});
$(".navcoursesedit").click(function (e) {
	$("#courses").addClass("d-none");
	$("#sections").addClass("d-none");
	$(".loginadmin").addClass("d-none");
	$(".loginstudent").addClass("d-none");
	$(".reg").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#coursesedit").removeClass("d-none");
	$(".loginadmin").addClass("d-none");
	$("#sectionsedit").addClass("d-none");

	displaycoursesedit();
});
function displaycoursesedit() {
	allcourses = [];
	httpRequest.open("Get", `http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/courses`);
	httpRequest.send();
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			allcourses = JSON.parse(httpRequest.response);
			var cont = "";
			for (var i = 0; i < allcourses.length; i++) {
				cont += `
        <div class="courseedit shadow-lg">
                    <h3>${allcourses[i].course_code}</h3>
                    <p>${allcourses[i].course_name}</p>
                    <div class="my_btns">
                        
                        <button type="button" class="btn btn-success" onclick="courseedit('${allcourses[i].course_code}' )" >Course Edit</button>
                        <button type="button" class="btn btn-danger" onclick="coursedelete('${allcourses[i].course_code}')">Delete</button>
                    </div>
        </div>
        `;
			}
			document.querySelector("#coursesedit .container").innerHTML = cont;
		}
	});
}
function sectionedit(section_name, section_type, coursecode) {
	$("#courses").addClass("d-none");
	$("#sections").addClass("d-none");
	$(".courseediting").addClass("d-none");
	$("#coursesedit").addClass("d-none");
	$(".loginadmin").addClass("d-none");
	$("#sectionsedit").removeClass("d-none");

	var cont = `
        <div class="sectionedit shadow-lg">
        <h3>${coursecode} ${section_type} ${section_name} Section edit</h3>
        <div class="d-flex justify-content-start flex-wrap">
          
          
          <input
            class="secday form-control w-50"type="text"placeholder="section_day"/>
        <input class="secfrom form-control w-50" type="text" placeholder="section_from" />
          <input class="secto form-control w-50" type="text" placeholder="section_to" />
          <input class="secinst form-control w-50" type="text" placeholder="instructor_username"/>
        </div>

        <div class="my_btns">
                        
                    <button type="button" onclick="sectioneditsubmit('${section_name}', '${section_type}', '${coursecode}')" class="btn btn-primary mt-2">Edit</button>
                    <button type="button" onclick="sectiondelete('${section_name}', '${section_type}', '${coursecode}')" class="btn btn-danger mt-2">delete</button>
                  </div>
      </div>
        `;

	document.querySelector("#sectionsedit .container").innerHTML = cont;
}
function sectiondelete(section_name, section_type, coursecode) {
	httpRequest.open(
		"DELETE",
		`http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/sections/${coursecode}/${section_name}/${section_type}`
	);
	httpRequest.setRequestHeader("Authorization", "Bearer " + token);
	httpRequest.send();
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			if (JSON.parse(httpRequest.response).error) {
				window.prompt(JSON.parse(httpRequest.response).error.msg);
				$("#sectionsedit").addClass("d-none");
			} else {
				$("#sectionsedit").addClass("d-none");
			}
			console.log(httpRequest.response);
		}
	});
}
function sectioneditsubmit(section_name, section_type, coursecode) {
	send = {
		section: {
			course_code: coursecode,
			section_name: section_name,
			section_type: section_type,
			section_day: document.querySelector(".secday").value,
			section_from: document.querySelector(".secfrom").value,
			section_to: document.querySelector(".secto").value,
			instructor_username: document.querySelector(".secinst").value,
		},
	};
	send = JSON.stringify(send);
	httpRequest.open(
		"PATCH",
		`http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/sections/${coursecode}/${section_name}/${section_type}`
	);
	console.log(send);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.setRequestHeader("Authorization", "Bearer " + token);
	httpRequest.send(send);
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			if (JSON.parse(httpRequest.response).error) {
				window.prompt(JSON.parse(httpRequest.response).error.msg);
				$("#sectionsedit").addClass("d-none");
			} else {
				$("#sectionsedit").addClass("d-none");
			}
			console.log(httpRequest.response);
		}
	});
}

function coursedelete(course_code) {
	httpRequest.open(
		"DELETE",
		`http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/courses/${course_code}`
	);

	httpRequest.setRequestHeader("Authorization", "Bearer " + token);
	httpRequest.send();
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			if (JSON.parse(httpRequest.response).error) {
				window.prompt(JSON.parse(httpRequest.response).error.msg);
			} else {
				window.prompt("edited successfully");
			}
		}
	});
	$("#coursesedit").addClass("d-none");
}
function courseedit(course_code) {
	$("#coursesedit").addClass("d-none");
	$(".courseediting").removeClass("d-none");
	document.querySelector(".courseediting").innerHTML = `
    <div class="course shadow-lg">
    <p>${course_code}</p>
    <input class="coursenameedit form-control m-auto" placeholder="New Course Name" type="text"/>
    <button class="btn" onclick="coursesubmit('${course_code}')">Finish Editing</button>
                    
                    
    </div>
    `;
}
function coursesubmit(coursecode) {
	var coursename = document.querySelector(".coursenameedit").value;
	send = {
		course: {
			course_code: coursecode,
			course_name: coursename,
		},
	};
	send = JSON.stringify(send);
	httpRequest.open(
		"PATCH",
		`http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/courses/${coursecode}`
	);
	console.log(send);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.setRequestHeader("Authorization", "Bearer " + token);
	httpRequest.send(send);
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			if (JSON.parse(httpRequest.response).error) {
				window.prompt(JSON.parse(httpRequest.response).error.msg);
				$(".courseediting").addClass("d-none");
			} else {
				$(".courseediting").addClass("d-none");
			}
		}
	});
}

function coursedetails(coursecode) {
	$("#courses").addClass("d-none");
	$("#sections").removeClass("d-none");
	$(".loginadmin").addClass("d-none");
	$(".loginstudent").addClass("d-none");
	$(".reg").addClass("d-none");
	httpRequest.open(
		"Get",
		`http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/sections/${coursecode}`
	);
	httpRequest.send();
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			sections = JSON.parse(httpRequest.response);
			var cont = "";
			for (var i = 0; i < allcourses.length; i++) {
				cont += `
        <div class="section shadow-lg">
                    <h3>${coursecode}</h3>
                    <div class="d-flex justify-content-start">
                      <p>${sections[i].section_name}</p>
                      <p>${sections[i].section_type}</p>
                    </div>
                    <p>${sections[i].section_day}</p>
                    <div class="time d-flex justify-content-between">
                      <p>From ${sections[i].section_from} To ${sections[i].section_to}</p>
                      <p>${sections[i].instructor_username}</p>
                    </div>
                    <div class="my_btns">
                        
                    <button type="button" onclick="sectionedit('${sections[i].section_name}', '${sections[i].section_type}', '${coursecode}')" class="btn btn-primary mt-2">Edit</button>
                    <button type="button" onclick="sectiondelete('${sections[i].section_name}', '${sections[i].section_type}', '${coursecode}')" class="btn btn-danger mt-2">delete</button>
                  </div>
                    </div>
                    
        `;
			}
			document.querySelector("#sections .container").innerHTML = cont;
		}
	});
}

function displaycourses() {
	httpRequest.open("Get", `http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/courses`);
	httpRequest.send();
	httpRequest.addEventListener("readystatechange", function () {
		if (httpRequest.readyState == 4) {
			allcourses = JSON.parse(httpRequest.response);
			var cont = "";
			for (var i = 0; i < allcourses.length; i++) {
				cont += `
        <div class="course shadow-lg">
                    <h3>${allcourses[i].course_code}</h3>
                    <p>${allcourses[i].course_name}</p>
                    <button class="btn" onclick="coursedetails('${allcourses[i].course_code}')">Course Sections</button>
        </div>
        `;
			}
			document.querySelector("#courses .container").innerHTML = cont;
		}
	});
}
