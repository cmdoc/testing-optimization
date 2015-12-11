module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		sass:{
			compile:{
				files:{
					'css/refineSearch.css' : 'sass/refineSearch.scss'
				}
			}	
		},
		watch:{
			sass:{
				files:'sass/*.scss',
				tasks:'sass'
			}
		},
		express:{
			all:{
				options:{
					port:9000,
					hostname:'localhost',
					bases: ['.'],
					livereload:true
				}
			}
		}		

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');	

	grunt.registerTask('default', ['sass', 'watch']);
	grunt.registerTask('server', ['express', 'watch']);	

}
