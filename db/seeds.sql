

INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Representative', 50000, 1),
('Software Engineer', 90000, 2),
('Senior Software Engineer', 120000, 2),
('Financial Analyst', 75000, 3),
('HR Manager', 70000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 3, NULL),
('Mike', 'Johnson', 2, 1),
('Emily', 'Davis', 4, 2),
('Sarah', 'Wilson', 5, NULL);
       
