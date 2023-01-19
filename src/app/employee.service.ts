import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count, Departments, Employee, EmployeeLeave, PersonalInfo, ProjectEmployees, Projects } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:80/allemployees";
  private baseURL1 = "http://localhost:80/manager";
  private baseURL3 = "http://localhost:80/employee";
  private baseURL4 = "http://localhost:82/leave";
  private baseURL5 = "http://localhost:81/payroll";
  private baseURL6 = "http://localhost:83/department";
  private baseURL7 = "http://localhost:8080/auth";


  constructor(private httpClient: HttpClient) { }

  getAllEmployees(eid: string | null): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/${eid}`)
  }

  searchAllEmployees(eid: string | null, enteredSearchValue: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/${eid}/${'search'}/${enteredSearchValue}`)
  }

  filterAllEmployees(eid: string | null, criteriaFilter: Employee): Observable<Employee[]> {
    return this.httpClient.post<Employee[]>(`${this.baseURL}/${eid}/${'filter'}`, criteriaFilter)
  }


  getEmployeesUnderManager(eid: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL1}/${eid}/${'view-employees'}`)
  }

  createEmployee(eid:string | null,employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL1}/${eid}/${'create-employee'}`, employee);
  }

  createUser(eid:string | null,employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL7}/${'create-user'}/${eid}`, employee);
  }

  createPayrollInfoForNewEmployee(eid:string | null,employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL5}/${eid}/${'add-info'}`, employee);
  }

  createLeaveInfoForNewEmployee(eid:string | null,employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL4}/${'employee'}/${eid}/${'add-info'}`, employee);
  }

  addNewEmployeeToDepartment(eid:string | null,employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL6}/${eid}/${'add-employee'}`, employee);
  }


  getEmployeeById(eid: string | null,childEid:string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL1}/${eid}/${'employee-detail'}/${childEid}`);
  }

  getPersonalInfoById(eid: string): Observable<PersonalInfo> {
    return this.httpClient.get<PersonalInfo>(`${this.baseURL3}/${eid}`);
  }

  updatePersonalInfoById(eid: string, personalInfo: PersonalInfo): Observable<Object> {
    return this.httpClient.put(`${this.baseURL3}/${eid}`, personalInfo);
  }

  updateEmployee(eid:string | null , childEid: string, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL1}/${eid}/${'update-employee'}/${childEid}`, employee);
  }

  deleteEmployee(eid: string,childEid: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL1}/${eid}/${'delete-employee'}/${childEid}`);
  }

  getEmployeesLeaveData(eid: string): Observable<EmployeeLeave[]> {
    return this.httpClient.get<EmployeeLeave[]>(`${this.baseURL4}/${'manager'}/${eid}`)
  }

  getEmployeeLeaveDataByID(eid: string): Observable<EmployeeLeave> {
    return this.httpClient.get<EmployeeLeave>(`${this.baseURL4}/${'employee'}/${eid}`)
  }

  requestLeave(eid: string, employeeLeaveData: EmployeeLeave): Observable<Object> {
    return this.httpClient.put(`${this.baseURL4}/${'employee/request-leave'}/${eid}`, employeeLeaveData);
  }

  approveLeave(eid: string, childEid: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL4}/${'manager'}/${eid}/${'approve'}/${childEid}`);
  }

  rejectLeave(eid: string, childEid: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL4}/${'manager'}/${eid}/${'reject'}/${childEid}`);
  }

  getAllEmployeesForPayroll(eid: string | null): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL5}/${eid}`)
  }



  issuePayCheck(eid: string | null, childEid: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL5}/${eid}/${'issue'}/${childEid}`);
  }

  getAllDepartments(eid: string | null): Observable<Departments[]> {
    return this.httpClient.get<Departments[]>(`${this.baseURL6}/${eid}`)
  }

  getDepartmentByID(eid: string | null, did: string): Observable<Departments> {
    return this.httpClient.get<Departments>(`${this.baseURL6}/${eid}/${'one'}/${did}`);
  }

  saveProjectInDepartmentOfID(eid: string | null, did: string, customObj: Projects): Observable<Object> {
    return this.httpClient.put(`${this.baseURL6}/${eid}/${'save-project'}/${did}`, customObj);
  }

  getDetailOfEmployeesUnderDepartment(eid: string | null, did: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL6}/${eid}/${'details'}/${did}`)
  }

  saveEmployeeToAProject(eid: string | null, customObj: any) {
    //console.log(customObj)
    return this.httpClient.post(`${this.baseURL6}/${eid}/${'save-employee'}`, customObj);
  }

  getCount(eid: string | null): Observable<Count> {
    return this.httpClient.get<Count>(`${this.baseURL6}/${eid}/${'get-count'}`)
  }
}
